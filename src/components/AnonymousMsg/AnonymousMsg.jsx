import React from 'react'

const AnonymousMsg = () => {
  return (
    <div>
      <p>
        You have signed in with an anonymous user account - this allows you
        access to:
      </p>
      <ul>
        <li>browse the protected routes in this application</li>
        <li>browse the protected routes in this application</li>
        <li>create and save data (stored in the Firestore database)</li>
        <li>logout</li>
      </ul>
      <p>
        Once you log out you cannot log back in using the same anonymous
        account. Subsequent logins will create a new account.
      </p>
    </div>
  )
}

export default AnonymousMsg
