export interface IProps {
    
}
 
const SignUpForm: React.FC<IProps> = () => {
    return (
        <div className='sign-up-form'>
            <h1>Sign Up</h1>

            Email Adress
            <input type="text"/>

            Password
            <input type="text"/>
            
            Confirm password
            <input type="text"/>

            <button>Submit</button>
        </div>
    );
}
 
export default SignUpForm;