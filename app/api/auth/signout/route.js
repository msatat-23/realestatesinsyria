import { NextResponse } from 'next/server';
import { signOut } from '@/auth';

export async function POST() {
    await signOut();
    return NextResponse.redirect(new URL('/login', process.env.NEXTAUTH_URL));
}