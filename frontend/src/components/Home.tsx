import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField  from '@mui/material/TextField';
import Button from '@mui/material/Button/Button';
import Container from '@mui/material/Container/Container';
import Card from '@mui/material/Card/Card';
import CardContent from '@mui/material/CardContent/CardContent';
import Typography from '@mui/material/Typography/Typography';
import { List, ListItem } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy as codeStyle} from 'react-syntax-highlighter/dist/esm/styles/prism';
import Header from './Header';
import GenericButton from './GenericButton';

interface ApiInfo {
  name: string;
  version: string;
  definition_url: string;
}

export default function Home() {
  const [size, setSize] = useState<String>("25")
  const [values, setValues] = useState<ApiInfo[]>([{name : "API name", version: "API version", definition_url: "Definition Url"}]) 
  const [apiDefinition, setApiDefinition] = useState<String>("Api Definition")

  function handleApiNameClick(apiInfo : ApiInfo) {
    fetch(
      '/api/definition',
      {
      method :"POST",
      headers: {
        'Content-Type' : 'application/json',
        'Accept': 'application/json;odata=verbose',
      },
      body : JSON.stringify(apiInfo),
      }
    )
    .then(response => response.json())
    .then(data => setApiDefinition(data["api_definition"]))
    .catch(error => console.log(error))
    console.log(apiDefinition)
  }


  function handleButtonClick() {
    fetch(
      '/apis/' + size,
      {
      method :"GET",
      headers : {
        'Content-Type':'application/json',
        'Accept': 'application/json',
        "Access-Control-Allow-Origin": "*",
      },
      }
    )
    .then(response => response.json())
    .then(data => setValues(data["apis_info"]))
    .catch(error => console.log(error))
    console.log(values)
  }

  const headerProps = {title:"Web Scrapping APIs", description:"Click on any API to read its definition"} 

  return (
    <Container maxWidth="lg">
      <Box justifyContent="center" alignItems="center">
        <Header {...headerProps}></Header>
        <Grid container spacing={5} sx={{ m: 3, height: 100 }}>
          <Grid item xs={4}>
            <TextField 
              id="outlined-basic" 
              label="Data size"
              variant="outlined"
              fullWidth
              value={size} 
              onChange={(e)=>{setSize(e.target.value)}}/>
          </Grid>
          <Grid item xs={8}>
            <GenericButton 
              title={"Retrieve"}
              handleClick = {handleButtonClick}
              >
              </GenericButton>
          </Grid>
          <Grid item xs={4}>
              <Typography>API Names</Typography>
              <List>
                {values.map((row) => (
                      <ListItem
                        key={row.name + row.version}
                        button={true}
                        onClick={(e) => {handleApiNameClick(row);  console.log(e)}}
                        >
                          {row.name}
                        </ListItem>))
                }
              </List>
          </Grid>
          <Grid item xs={8}>
            <Card>
              <CardContent>
                <Typography>API definition</Typography>
                <SyntaxHighlighter language="jsx" style={codeStyle}>
                  {String(apiDefinition)}
                </SyntaxHighlighter>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>   
  );
}