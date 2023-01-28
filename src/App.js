import Button from "./Button";
const App = () =>{
    return <div>
    <h1>Recently Used Websites</h1>
    <h3>Which website do you want to open?</h3>
    <Button name="Google" link="https://google.com"></Button>
    <Button name="Youtube"  link="https://youtube.com"></Button>
    <Button name="Gmail" link="https://gmail.com"></Button> <br></br>
    <Button name="LinkedIn" link="https://linkedin.com"></Button> 
    <Button name="Github"link="https://github.com"></Button>
    </div>
}

export default App;