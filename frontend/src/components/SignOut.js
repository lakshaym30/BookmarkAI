import { signInWithGoogle, signOut } from '../fb';

const SignOut = () => {
  return (
    <div>
      <button className="button" onClick={signOut}><i className="fab fa-google"></i>Sign Out</button>
    </div>
  )
}

export default SignOut;