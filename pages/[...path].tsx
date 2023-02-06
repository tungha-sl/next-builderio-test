import React from 'react';
import {useRouter} from 'next/router';
import {builder, BuilderComponent, useIsPreviewing} from '@builder.io/react';
import DefaultErrorPage from 'next/error';
import Head from 'next/head';
import {NextParsedUrlQuery} from "next/dist/server/request-meta";
import {GetStaticProps, NextPage} from "next";

interface IParams extends NextParsedUrlQuery {
    path: string[];
}

type Props = {
    page: any;
};

// Replace with your Public API Key
builder.init(process.env.NEXT_PUBLIC_BUIDERIO_API_KEY || '');

export const getStaticProps: GetStaticProps<Props, IParams> = async ({params, locale}) => {
    // Fetch the builder content
    const page = await builder
        .get('page', {
            userAttributes: {
                urlPath: '/' + (params?.path?.join('/') || ''),
                locale: locale
            },
            options: {
                locale: locale,
            }
        })
        .toPromise();

    return {
        props: {
            page: page || null,
        },
        revalidate: 5
    };
}

export async function getStaticPaths() {
    // Get a list of all pages in builder
    const pages = await builder.getAll('page', {
        // We only need the URL field
        fields: 'data.url',
        options: {noTargeting: true},
    });

    return {
        paths: pages.map(page => `${page.data?.url}`),
        fallback: true,
    };
}

const PathPage: NextPage<Props> = ({page}) => {
    const router = useRouter();
    const isPreviewing = useIsPreviewing();

    if (router.isFallback) {
        return <h1>Loading...</h1>
    }

    if (!page && !isPreviewing) {
        return <DefaultErrorPage statusCode={404}/>
    }

    return (
        <>
            <Head>
                <title>{page?.data.title}</title>
            </Head>
            <main>
                <div>
                    <p>file: <code>pages/[...path].tsx</code></p>
                    <p>locale: <code>{router.locale}</code></p>
                </div>
            </main>
            {/* Render the Builder page */}
            <BuilderComponent locale={router.locale} model="page" content={page}/>
        </>
    );
}

export default PathPage
