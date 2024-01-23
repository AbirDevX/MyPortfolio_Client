import SignInCompo from "@/components/signInCompo";
import GustLayout from "@/layout/gustLayout";
import { GetServerSideProps } from "next";
import Head from "next/head";

interface IProps {
    name: string;
};

export const Login = ({ name }: IProps) => {
    console.log(name)

    return (
        <>
            <Head>
                <title>SignIn</title>
                <meta charSet="UTF-8" />
                <meta name="description" content="abir santra profile" />
                <meta name="keywords" content="abir santra web developer " />
                <meta name="author" content="abir santra" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="./assets/favicone.png" />
            </Head>
            <GustLayout>
                <SignInCompo />
            </GustLayout>
        </>
    )
}

Login.displayName = 'SignInTwo'

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const accessToken = req.cookies[process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME as string];
    const refreshToken = req.cookies[process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME as string];

    if (accessToken && refreshToken) {
        return {
            redirect: {
                destination: "/dashboard",
                permanent: false,
            },
        }
    } else {
        return {
            props: {
                name: "signIn",
            }
        }
    };

}
export default Login;
