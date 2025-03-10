import * as React from 'react';

interface EmailTemplateProps {
    name: string;
    email: string;
    message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    name,
    email,
    message,
}) => {
    return (
        <div>
            <h1>Welcome, {name}!</h1>
            <p>You have received a new message:</p>
            <blockquote>{message}</blockquote>
            <p>From: {email}</p>
        </div>
    );
};
