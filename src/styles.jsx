import styled from 'styled-components'

export const ParentWrapper = styled.div``;

export const Title = styled.h2`
background-color: black;
color: Orange;
padding: 20px;
margin:0;
font-family: 'Roboto', sans-serif;
display:flex;
justify-content: space-between;

`;

export const DragDropArea = styled.div`
padding: 75px;
cursor: grab;
width:100%;
margin : 0 auto;
margin-top: 15px;
border: 2px dashed black;
font-weight: bold;
`;

export const ImageWrapper = styled.div`
height: 10%;
width: 50%;
margin : 0 auto;
text-align:center;
margin-top: 10px;
`;

export const Cavas = styled.canvas`

`;

export const Preview = styled.p``;

export const Button = styled.button`
padding: 10px;
background-color:black;
border-radius: 10px;
margin-bottom: 0;
border:none;
color: white;
font-weight: 600;
cursor:pointer;
&:hover {
    background-color:#64dd64;
    color: white;
}
`;

export const ListItem = styled.li`
padding: 10px;
background-color:#64dd64;
color: white;
width: 90%;
margin: 0 auto;
margin-bottom: 5px;
border-radius:5px;
list-style: none
`;

export const ButtonWrapper = styled.div`
display: grid;
width: 30%;
margin: 0 auto;
grid-template-columns: auto auto;
`;

export const NavBar = styled.div`

`;
export const Anchor = styled.a`
text-decoration: none;
margin-right:10px;
background-color:#64dd64;
color: white;

padding:10px 10px 10px 10px;
border-radius: 5px;
font-size:16px;
font-weight: 300;

&:hover {
    background-color:orange;
    color: black;
`;

export const SubHeader = styled.h3`
padding: 15px;
// background-color: white;
color: black;
border-radius: 5px;
font-family:'Metropolis-Regular';
font-size: 28px;
width: 50%;
margin: 10px auto;
// border: 1px solid black;
`;

export const UploadedImageContainer = styled.ul`
display: grid;
grid-template-columns: auto auto auto;
grid-row-gap:20px;
`;

export const LoaderComponent = styled.div`
width: 100%;
height: 100%;
text-align:center;
position: absolute;
top: 45%;
`;

export const OverLayUpload = styled.div`
position: fixed;
width: 100%;
height: 100%;
margin: 0 auto;
z-index: -100;
background-color: grey;
// opacity:0.5;
color: green;
font-size: 30px;
text-align: center;
`;

export const DeleteButton = styled.button`
padding: 10px;
background-color:red;
border-radius: 10px;
margin-bottom: 0;
border:none;
color: white;
font-weight: 600;
cursor:pointer;
width: 100%;
margin : 0 auto;
text-align: center;
`;

export const DeleteButtonWrapper = styled.div`
width: 20%;
margin : 0 auto;
`;