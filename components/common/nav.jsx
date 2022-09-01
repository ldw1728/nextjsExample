import Link from 'next/link';

export default function nav(){
    return (
        <div className='nav'>
        <Link href="/"><a>home</a></Link>
        <span>|</span>
        <Link href="/api/hello"><a>api</a></Link>
        <span>|</span>
        <Link href="/about/"><a>about</a></Link>
        <span>|</span>
        <Link href="/about/1"><a>about1</a></Link>
        <span>|</span>
        <Link href="/about/2/hi"><a>about2</a></Link>
        <span>|</span>
        <Link href="/about/12345/hnm"><a>about3</a></Link>
        <span>|</span>
        <Link href="/posts"><a>posts</a></Link>
        <span>|</span>
        </div>
    );
};