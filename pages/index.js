import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Index() {
    useEffect(() => {
        window.location = '/home';
    });
    return <></>;
}
