import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Select, Input, RTE } from '../index'
import service from '../../appWrite/config'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, getValues, control } = useForm({

        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active"
        }

    })
    const navigate = useNavigate()
    const userData = useSelector(state => state.user.userData)

    const sumbit = async (data) => {
        if (post) {
            const file = data.image[0] ? service.uploadFile(data.image[0]) : null
            if (file) {
                service.deleteFile(post.imageId)
            }

            const dbPost = await service.updatePost(post.$id, {
                ...data,
                imageId: file ? file.$id : undefined
            })

            if (dbPost) {
                navigate(`/post/${post.$id}`)
            }
        } else {
            const file = await service.uploadFile(data.image[0])
            if (file) {
                const fileId = data.$id
                data.imageId = fileId
                const dbPost = await service.createPost({
                    ...data,
                    userId: userData.$id
                })

                if (dbPost) {
                    navigate(`/post/${post.$id}`)
                }
            }
        }

    }

    const slugTransform = useCallback((value) => {
        if (value && typeof (value) === 'string') {
            return value
                .trim()
                .toLocaleLowerCase()
                .replace(/\s+/g, '-')
        }
        return "";
    } , [] )

    useEffect(() => {
        const subscription = watch((value , {name}) => {
            if(name === 'title') {
                setValue('slug' , slugTransform(value.title))
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [watch , slugTransform , setValue])

    return (
        <form onSubmit={handleSubmit(sumbit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={service.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm