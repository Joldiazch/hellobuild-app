// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import fetch from 'cross-fetch';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getSession } from "next-auth/client"

export default function ComboBox(props) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(open && options.length === 0);

  const { handlerRepoSelected, handlerClosedSearch } = props;
  
  const onChangeHandle = async value => {
    setLoading(true);
    const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN
    const user = JSON.parse(localStorage.getItem("user"));

    if (value === ""){ handlerClosedSearch() }

    const queryString = 'q=' + encodeURIComponent(`${value} in:name user:${user.githubusername}`);
    const url = `https://api.github.com/search/repositories?${queryString}&order=desc&per_page=50&page=1`

    const response = await fetch(
      url, {
      method: 'GET',
      headers: {
        "Content-type": "application/json;charset=UTF-8",
        'Authorization': 'Bearer ' + token,
      }
    });

    const data = await response.json();
    setLoading(false)
    const listOptions = data.items ? data.items : []
    setOptions(listOptions);

  };

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="combo-box-demo"
      options={options}
      filterOptions={x => x}
      getOptionLabel={(option) => option.name}
      getOptionSelected={(option, value) => {
        if (option.name === value.name){
          handlerRepoSelected(value);
          return true;
        }else{
          return false;
        }
      }}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Find a repository..."
          variant="outlined"
          onChange={ev => {
            // dont fire API if the user delete or not entered anything
            if (ev.target.value !== "" || ev.target.value !== null) {
              onChangeHandle(ev.target.value);
            }
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            )
          }}
        />
      )}
    />
  );
}