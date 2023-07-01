import {useState,useContext} from 'react';
import {Box,TextField,Button,styled,Typography} from '@mui/material';

import { API } from '../../service/api';
import { DataContext}  from '../../context/DataProvider';

import { useNavigate } from 'react-router-dom'; // to navigate to home after successfull login 

const Component=styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/0.6)
    


`
const Image=styled('img')({
    width: 100,
    margin:'auto',
    display: 'flex',
    padding:'50px 0 0'


})

const Wrapper=styled(Box)`
    padding: 25px 35px;
    display:flex;
    flex: 1;
    flex-direction: column;
    &>div,&>button ,&>p{
        margin-top: 20px
    }

`;

const LoginButton=styled(Button)`
    text-transform:none;
    background: #FB641B;
`;

const SignupButton=styled(Button)`
    text-transform:none;
    background: #FFF;
    color: #2874f0;
`;

const Text=styled(Typography)`
    color:#878787;
   
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`
//Object to store the signup details.
const signupInitialValues={  
    name:'',
    username:'' ,
    password:''

}
const loginInitialValues={
    username:'',
    password:'',
}




const Login = ({isUserAuthenticated})=>{

    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';

    const[account,toggleAccount] =useState("login");
    const[signup,setSignup] =useState(signupInitialValues);
    const[login,setLogin]=useState(loginInitialValues);
    const[error,setError]=useState('');

    const {setAccount}=useContext(DataContext);
    const navigate=useNavigate();
    

    const toggleSignup=()=>{
            toggleAccount('signup');
    }
    const toggleLogin=()=>{
            toggleAccount('login');
    }

    const onInputChage=(e)=>{
        setSignup({...signup,[e.target.name] :e.target.value}) // added (...signup) to avoid overriding.
    }


    const signupUser= async ()=>{
       let response=await API.userSignup(signup);
       console.log(response);
       if(response.isSuccess){
        setError('')
        setSignup(signupInitialValues)
        toggleAccount('login');
       }
       else{
        setError('Something went wrong..')

       }
    }
    const onValueChange=(e)=>{
        setLogin({...login,[e.target.name] :e.target.value}) 
    }
    const loginUser= async()=>{
        let response= await API.userLogin(login) ;
        if(response.isSuccess){
            setError('');

            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);

            setAccount({username: response.data.username,name:response.data.name});

            isUserAuthenticated(true)

            navigate('/');

            
        }
        else{
            setError('Something went wrong please try again')
        }
    }

    
    return (
        <Component>
            <Box>
                <Image src={imageURL} alt ="login"/>
                {
                account === 'login' ?
                <Wrapper>
                    <TextField variant="standard" value={login.username} onChange={(e)=>onValueChange(e)} name='username' label="Enter Username"/>
                    <TextField variant="standard" value={login.password} onChange={(e)=>onValueChange(e)} name='password' label="Enter Password" type="password" />
                    <LoginButton variant="contained" onClick={()=>loginUser()} >Login</LoginButton>
                    <Text style={{textAlign:"center"}} >OR</Text>
                    <SignupButton onClick={()=> toggleSignup()} variant="outlined">Create an account</SignupButton> 
                </Wrapper>   
                :
                <Wrapper>
                    <TextField variant="standard"  onChange={(e)=>onInputChage(e)} name='name' label="Enter Name"/>
                    <TextField variant="standard" onChange={(e)=>onInputChage(e)} name='username' label="Enter Username"/>
                    <TextField variant="standard" onChange={(e)=>onInputChage(e)} name='password' label="Enter Password" type="password" />
                    {error && <Error>{error}</Error>}
                    <SignupButton variant="outlined" onClick={()=>signupUser()}>Sign up</SignupButton>
                    <Text style={{textAlign:"center"}} >OR</Text>
                    <LoginButton onClick={()=> toggleLogin()} variant="contained">Already have an account?</LoginButton> 
                </Wrapper>
                }
            </Box>
        
        </Component>
    )
}

export default Login;