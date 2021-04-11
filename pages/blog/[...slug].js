import { getMdxNode, getMdxPaths } from "next-mdx/server"
import { useHydrate } from "next-mdx/client";
import { useAuth0 } from "@auth0/auth0-react";

import { mdxComponents } from "../../components/mdx-components";


export default function PostPage({ post }) {
    const {
        loginWithRedirect,
        logout,
        isAuthenticated,
        user
    } = useAuth0();

    const content = useHydrate(post, {
        components: mdxComponents
    })

    return <div className="site-container">
        <article>
            <h1 className="text-4xl font-bold">{post.frontMatter.title}</h1>
            <p>{post.frontMatter.exercpt}</p>
            <hr className="my-4" />
            <div className='prose'>{content}</div>
        </article>
        <form>
            <textarea rows="4" className='border border-gray-400 rounded w-full block' />

            <div className="mt-4">
                {
                    isAuthenticated ?
                        <div className="flex items-center space-x-2">
                            <button className='bg-blue-800 text-white px-2 py-1 rounded' >send</button>
                            <img src={user.picture} width={30} className=' rounded-full' />
                            {console.log(user)}
                            <span>{user.name}</span>
                            <button typeof='button'
                                onClick={() => logout({ returnTo: process.env.NEXT_PUBLIC_URL + "/blog" })}
                            >Logout</button>
                        </div>
                        :
                        <button typeof='button' className='bg-blue-800 text-white px-2 py-1 rounded'
                            onClick={() => loginWithRedirect()}
                        >Login</button>


                }
            </div>

        </form>
    </div>
}

export async function getStaticPaths() {
    return {
        paths: await getMdxPaths('post'),
        fallback: false
    }
}

export async function getStaticProps(context) {
    const post = await getMdxNode('post', context);

    if (!post) {
        return {
            notFound: true
        }
    }
    return {
        props: { post }
    }
}