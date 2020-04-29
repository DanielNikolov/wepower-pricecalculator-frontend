import React from 'react';

const History = (props) => {
    const historyList = props.history.length > 10 ? props.history.slice(props.history.length-10) : props.history;
    return (
      <table>
        <tbody>
          {historyList.map((history) => (
            <tr>
              <td>{history.timeStamp.toISOString()}</td>
              <td>{history.start.toISOString()}</td>
              <td>{history.end.toISOString()}</td>
              <td>{history.shape}</td>
              <td>{history.product}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
}

export default History;