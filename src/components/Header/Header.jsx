import React from 'react'
import { useSelector } from 'react-redux'
import { LogoutBtn, Logo, Container } from '../index'
import { Link } from 'react-router'
import { useNavigate } from 'react-router'


function Header() {

  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const naItems = [

    {
      name: "Home",
      slug: '/',
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },

  ]

  return (
    <Header className="py-3 shadow bg-gray-500">
      <Container>

        <nav className='flex'>

          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px' />
            </Link>
          </div>

          <ul className='flex ml-auto'>
            {naItems.map((items) =>
              items.active ? (
                <li key={items.name}>
                  <button
                    onClick={() => navigate(items.slug)}
                    className='inline-block px-6 py-2 duration-200 rounded-full hover:bg-blue-300'
                  >
                    {items.name}
                  </button>
                </li>
              ) : null
            )}

            {authStatus && (
              <li>
                <LogoutBtn/>
              </li>
            )}
          </ul>

        </nav>
      </Container>
    </Header>
  )
}

export default Header