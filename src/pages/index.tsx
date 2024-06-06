import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useState } from 'react'
import Example from '../components/Example';
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import { NextPageContext } from 'next';
import styles from '../styles/style.module.css'


export default function Home() {
  const {data: session} = useSession();
  console.log(session)
  return (
    <>
     <div id={styles.centeredDiv}>
      <h3 id={styles.centeredText} >{session?.user?.name}</h3>
      <p>test</p>
      <img id={styles.profileImage} src={session?.user?.image!}/>
      <br />
      {
        session ?  (<Button id={styles.profileButton} onClick={() => signOut()}>Sign Out</Button>)
         :  (
          <Button id={styles.profileButton} onClick={() => signIn()}>Sign In</Button>
         )}
      <Example/>
      </div>
    </>
  );
}

export async function getServerSideProps( ctx:NextPageContext) {
  const session = await getSession(ctx);
  return {
    props: {
      session,
    },
  }
}
