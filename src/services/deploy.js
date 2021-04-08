import { Button } from '@chakra-ui/react';
import React from 'react';
import firebase, { firestore } from './firebase';

const categoriesData = [
  {
    name: 'all',
  },
  {
    name: 'furniture',
  },
  {
    name: 'clothes',
  },
  {
    name: 'books',
  },
  {
    name: 'toys',
  },
  {
    name: 'medics',
  },
  {
    name: 'appliances',
  },
];

const reportReasons = [
  {
    id: '1',
    type: 'fake identity',
  },
  {
    id: '2',
    type: 'inappropriate content',
  },
  {
    id: '3',
    type: 'scam',
  },
];

const usersData = [
  {
    name: 'admin',
    uid: 'cdzPSpkyjnWdzWdgmXrViorrrRI3',
    // email: 'skiastep@gmail.com',
    idCard_url: [
      'https://imcdn.org/uploads/2017/08/lebanese-id-card.jpg',
      'https://imcdn.org/uploads/2017/08/lebanese-id-card.jpg',
    ],
    phoneNumber: '70123456',
    role: 'admin',
    isApproved: true,
  },
  {
    name: 'user 1',
    uid: 'SQZrKjfIxGcyBCLbnVXG78ief882',
    // email: "skybar_beirut@live.com",
    idCard_url: [
      'https://imcdn.org/uploads/2017/08/lebanese-id-card.jpg',
      'https://imcdn.org/uploads/2017/08/lebanese-id-card.jpg',
    ],
    phoneNumber: '70123456',
    role: 'user',
    isApproved: true,
  },
  {
    name: 'user 2',
    uid: 'IS7jkntzkLX8WIKyW40dyfEZru12',
    // email: 'lol@mail.com',
    idCard_url: [
      'https://imcdn.org/uploads/2017/08/lebanese-id-card.jpg',
      'https://imcdn.org/uploads/2017/08/lebanese-id-card.jpg',
    ],
    phoneNumber: '70123456',
    role: 'user',
    isApproved: false,
  },
  {
    name: 'user 3',
    uid: 'tTDecstMTESPLomin6UBB8FT3Uh1',
    // email: "test@mail.com",
    idCard_url: [
      'https://imcdn.org/uploads/2017/08/lebanese-id-card.jpg',
      'https://imcdn.org/uploads/2017/08/lebanese-id-card.jpg',
    ],
    phoneNumber: '70123456',
    role: 'user',
    isApproved: false,
  },
];

const itemsData = [
  {
    title: 'Red t-shirt',
    description: '',
    category: 'clothes',
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    location: [],
    uid: 'SQZrKjfIxGcyBCLbnVXG78ief882',
    image_url: 'https://www.marni.com/12/12386489MT_13_n_r.jpg',
    reports: [],
    requests: [],
    isActive: true,
    isDelivered: false,
  },
  {
    title: 'Hoodie, sweater and jeans',
    description: 'some random description',
    category: 'clothes',
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    location: [],
    uid: 'SQZrKjfIxGcyBCLbnVXG78ief882',
    image_url:
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    reports: [],
    requests: [],
    isActive: true,
    isDelivered: false,
  },
  {
    title: 'Blouse',
    description: 'some random description',
    category: 'clothes',
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    location: [],
    uid: 'IS7jkntzkLX8WIKyW40dyfEZru12',
    image_url:
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=564&q=80',
    reports: [],
    requests: [],
    isActive: true,
    isDelivered: false,
  },
  {
    title: 'Cooking kit',
    description: 'some random description',
    category: 'appliances',
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    location: [],
    uid: 'tTDecstMTESPLomin6UBB8FT3Uh1',
    image_url:
      'https://images.unsplash.com/photo-1589983006655-4ef9a756ebe3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=727&q=80',
    reports: [],
    requests: [],
    isActive: true,
    isDelivered: false,
  },
  {
    title: 'Matt Ridley',
    description: 'some random description',
    category: 'books',
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    location: [],
    uid: 'tTDecstMTESPLomin6UBB8FT3Uh1',
    image_url:
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1386&q=80',
    reports: [],
    requests: [],
    isActive: true,
    isDelivered: false,
  },
];

const requests = [
  {
    requester: 'tTDecstMTESPLomin6UBB8FT3Uh1',
    requestee: 'tTDecstMTESPLomin6UBB8FT3Uh1',
    isApproved: false,
    reason: 'random reason',
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  },
];

const reports = [
  {
    reporter: 'tTDecstMTESPLomin6UBB8FT3Uh1',
    reportee: 'SQZrKjfIxGcyBCLbnVXG78ief882',
    reason: 'random reason',
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  },
];

const writeData = () => {
  console.log('deploying...');
  categoriesData.forEach((category) => {
    return firestore.collection('categories').doc(`${category.id}`).set({
      name: category.name,
    });
  });

  reportReasons.forEach((reason) => {
    return firestore.collection('reports_reasons').add({
      id: reason.id,
      type: reason.type,
    });
  });

  requests.forEach((request) => {
    return firestore.collection('requests').add({
      requester: request.requester,
      requestee: request.requestee,
      isApproved: request.isApproved,
      reason: request.reason,
      createdAt: request.createdAt,
    });
  });

  reports.forEach((report) => {
    return firestore.collection('reports').add({
      reporter: report.reporter,
      reportee: report.reportee,
      reason: report.reason,
      createdAt: report.createdAt,
    });
  });

  itemsData.forEach((item) => {
    return firestore.collection('items').add({
      title: item.title,
      description: item.description,
      category: item.category,
      createdAt: item.createdAt,
      location: item.location,
      uid: item.uid,
      image_url: item.image_url,
      reports: item.reports,
      requests: item.requests,
      isActive: item.isActive,
      isDelivered: item.isDelivered,
    });
  });

  usersData.forEach((user) => {
    return firestore.collection('users').add({
      uid: user.uid,
      idCard_url: user.idCard_url,
      phoneNumber: user.phoneNumber,
      role: user.role,
      isApproved: user.isApproved,
    });
  });
  console.log('data deployed successfully...');
};

export const DeployingData = () => {
  return <Button onClick={writeData}>export data</Button>;
};
