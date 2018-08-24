'use strict';
import React from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import {API_BASE_URL} from './config';

const Index = () => (
  <div>
    <Header />
    <h1>Prototyping Functionality</h1>
    <Link href="./table/Table">
    <a>Table</a>
    </Link>
  </div>
);

export default Index;