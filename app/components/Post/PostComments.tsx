"use client";

import { DiscussionEmbed } from 'disqus-react';

interface PostCommentsProps {
    url: string;
    identifier: string;
    title: string;
}

export default function PostComments({ url, identifier, title }: PostCommentsProps) {
    const disqusConfig = {
        url: url,
        identifier: identifier,
        title: title,
        language: "es_ES"
    };

    return (
        <div className="mt-10">
            <DiscussionEmbed
                shortname='https-www-dominicanna-net'
                config={disqusConfig}
            />
        </div>
    );
}
