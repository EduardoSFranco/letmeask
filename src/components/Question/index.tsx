import { ReactNode } from 'react';
import cn from 'classnames';
import "./styles.scss";

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    }
    children?: ReactNode;
    isAnswearded?: boolean;
    isHighLighted?: boolean;
}

export function Question({
    content,
    author,
    isAnswearded = false,
    isHighLighted = false,
    children,
}: QuestionProps) {
    return (
            <div className ={cn(
                    'question',
                    { answered: isAnswearded },
                    {highLighted: isHighLighted},
                )}
            >
                <p>{content}</p>
                <footer>
                    <div className="user-info">
                        <img src={author.avatar} alt={author.name} />
                        <span>{author.name}</span>
                    </div>
                    <div>{children}</div>
                </footer>
            </div>
    )
}