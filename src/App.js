import React, {useState } from 'react';
import 'date-fns'
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import History from '../src/components/History'
import './App.css';

function App() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [shape, setShape] = useState('mining')
  const [product, setProduct] = useState("energy");
  const [history, setHistory] = useState([]);
  const [results, setResults] = useState([]);

  const changeStartDateHandler = (date) => {
    setStartDate(date);
  };

  const changeEndDateHandler = (date) => {
    setEndDate(date);
  };

  const changeShapeHandler = (event) => {
    setShape(event.target.value);
  }

  const changeProductHandler = (event) => {
    setProduct(event.target.value);
  }

  const buttonClickHandler = () => {
    const targetUrl = new URL('http://localhost:8080/api/wepower/calculateprice');
    targetUrl.searchParams.append("start", startDate.getTime());
    targetUrl.searchParams.append("end", endDate.getTime());
    targetUrl.searchParams.append("customer", shape);
    targetUrl.searchParams.append("product", product);
    let historyRecords = [...history];
    historyRecords.push({
      timeStamp: new Date(),
      start: startDate,
      end: endDate,
      shape: shape,
      product: product,
    });

    fetch(targetUrl.href)
      .then(function (response) {
        if (response.status !== 200) {
          window.alert("ERROR");
          setHistory(historyRecords);
          return;
        }

        response.json().then(function (data) {
          if (!data.error) {
            window.alert(JSON.stringify(data));
          } else {
            window.alert(data.message);
          }
          setHistory(historyRecords);
        });
      })
      .catch(function (err) {
        window.alert("ERROR");
        setHistory(historyRecords);
      });
  }

  return (
    <div
      style={{
        margin: "20px 50px",
      }}
    >
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline-1"
            label="Start Date"
            value={startDate}
            onChange={changeStartDateHandler}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline-2"
            label="End Date"
            value={endDate}
            onChange={changeEndDateHandler}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
      </div>

      <div
        style={{
          width: "250px",
        }}
      >
        <FormControl className="">
          <InputLabel id="demo-simple-select-label">Shape Factor</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={shape}
            onChange={changeShapeHandler}
          >
            <MenuItem value="mining">Mining</MenuItem>
            <MenuItem value="industrial">Industrial</MenuItem>
            <MenuItem value="commercial">Commercial</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div
        style={{
          width: "250px",
        }}
      >
        <FormControl className="">
          <InputLabel id="demo-simple-select-label">Product</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={product}
            onChange={changeProductHandler}
          >
            <MenuItem value="energy">Energy</MenuItem>
            <MenuItem value="lgc">LGC</MenuItem>
            <MenuItem value="energy,lgc">Energy + LGC</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div>
        <button
          type="button"
          onClick={buttonClickHandler}
          disabled={startDate.getTime() > endDate.getTime()}
        >
          Query Prices
        </button>
      </div>
      <div>
        <History history={history} />
      </div>
    </div>
  );
}

export default App;
