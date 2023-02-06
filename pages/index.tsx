import Head from 'next/head'
import Link from "next/link";

export default function Home() {
    const links = [
        {
            href: '/test',
            label: 'No targeting',
        },
        {
            href: '/test-both',
            label: 'Targeting both locale en-US and jp-JP',
        },
        {
            href: '/test-en-us',
            label: 'Targeting locale=en-US',
        },
        {
            href: '/test-jp-jp',
            label: 'Targeting locale=jp-JP',
        },
    ];
    const locales = [
        'en-US',
        'jp-JP'
    ];
    return (
        <>
            <Head>
                <title>BuildIO Localization Test</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <main>
                <div>
                    <p>
                        <code>pages/index.tsx</code>
                    </p>
                </div>

                <div>
                    <ul>
                        {links.map(({href, label}, index) => (
                            <li key={index}>
                                <span>{label}</span>
                                <ol>
                                    <li>
                                        <Link
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {label} - default
                                        </Link>
                                    </li>
                                    {locales.map((locale, lindex) => (
                                        <li key={`${index}.${lindex}`}>
                                            <Link
                                                href={href}
                                                locale={locale}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {label} - {locale}
                                            </Link>
                                        </li>
                                    ))}
                                </ol>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </>
    )
}
