import Link from 'next/link';

export default function nav(){
    return (
        <div className='nav'>
        <Link href="/"><a>home</a></Link>
        <span>|</span>
        <Link href="/api/hello"><a>api</a></Link>
        <span>|</span>
        <Link href="/about"><a>about</a></Link>
        <span>|</span>
        </div>
    );
};