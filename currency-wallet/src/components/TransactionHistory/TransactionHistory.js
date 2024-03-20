// import React, { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import styled from 'styled-components';
// import { TransactionContext } from '../../context/TransactionContext';

// const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
// `;

// const TableHead = styled.thead`
//   background-color: #f2f2f2;
// `;

// const TableBody = styled.tbody``;

// const TableRow = styled.tr`
//   &:nth-child(even) {
//     background-color: #f2f2f2;
//   }
// `;

// const TableCell = styled.td`
//   padding: 10px;
//   border: 1px solid #ccc;
// `;

// const TransactionHistory = () => {
//   const { transactions, setTransactions } = useContext(TransactionContext);
//   const [transactionData, setTransactionData] = useState([]);

//   const fetchTransactions = async () => {
//     try {
//       const response = await axios.get('http://localhost:4000/api/transactions');
//       setTransactions(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const getUsername = async (userId) => {
//     try {
//       const response = await axios.get(`http://localhost:4000/api/user/${userId}`);
//       return response.data.username;
//     } catch (error) {
//       console.error(error);
//       return 'Unknown User';
//     }
//   };

//   const formatDate = (dateString) => {
//     const options = {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//       second: '2-digit',
//     };
//     return new Date(dateString).toLocaleDateString('en-US', options);
//   };

//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = [];
//       for (const transaction of transactions) {
//         const sender = await getUsername(transaction.sender);
//         const receiver = await getUsername(transaction.receiver);

//         data.push({
//           ...transaction,
//           senderUsername: sender,
//           receiverUsername: receiver,
//           createdAt: formatDate(transaction.createdAt),
//         });
//       }
//       setTransactionData(data);
//     };

//     fetchData();
//   }, [transactions]);

//   return (
//     <Table>
//       <TableHead>
//         <TableRow>
//           <TableCell>Amount</TableCell>
//           <TableCell>Currency</TableCell>
//           <TableCell>Sender</TableCell>
//           <TableCell>Receiver</TableCell>
//           <TableCell>Date</TableCell>
//         </TableRow>
//       </TableHead>
//       <TableBody>
//         {transactionData.map((transaction) => (
//           <TableRow key={transaction._id}>
//             <TableCell>{transaction.amount}</TableCell>
//             <TableCell>{transaction.currency}</TableCell>
//             <TableCell>{transaction.senderUsername}</TableCell>
//             <TableCell>{transaction.receiverUsername}</TableCell>
//             <TableCell>{transaction.createdAt}</TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// };

// export default TransactionHistory;


// import React, { useContext } from 'react';
// import styled from 'styled-components';
// import { TransactionContext } from '../../context/TransactionContext';

// const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   margin-top: 20px;
// `;

// const TableHeader = styled.th`
//   border: 1px solid #ddd;
//   padding: 8px;
//   text-align: left;
// `;

// const TableData = styled.td`
//   border: 1px solid #ddd;
//   padding: 8px;
// `;

// const TransactionHistory = () => {
//   const { transactions } = useContext(TransactionContext);

//   return (
//     <div>
//       <h2>Transaction History</h2>
//       <Table>
//         <thead>
//           <tr>
//             <TableHeader>Amount</TableHeader>
//             <TableHeader>Currency</TableHeader>
//             <TableHeader>Sender</TableHeader>
//             <TableHeader>Receiver</TableHeader>
//             <TableHeader>Date</TableHeader>
//           </tr>
//         </thead>
//         <tbody>
//           {transactions.map((transaction) => (
//             <tr key={transaction._id}>
//               <TableData>{transaction.amount}</TableData>
//               <TableData>{transaction.currency}</TableData>
//               <TableData>{transaction.sender}</TableData>
//               <TableData>{transaction.receiver}</TableData>
//               <TableData>
//                 {transaction.date ? new Date(transaction.date).toLocaleDateString() : 'Invalid Date'}
//               </TableData>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default TransactionHistory;
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { TransactionContext } from '../../context/TransactionContext';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: #f2f2f2;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ccc;
`;

const TransactionHistory = () => {
  const { transactions, setTransactions } = useContext(TransactionContext);
  const [transactionData, setTransactionData] = useState([]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/transactions');
      const updatedTransactions = response.data.map(transaction => ({
        ...transaction,
        receiverUsername: transaction.receiver,
      }));
      setTransactions(updatedTransactions);
    } catch (error) {
      console.error(error);
    }
  };

  const getUsername = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/user/${userId}`);
      return response.data.username;
    } catch (error) {
      console.error(error);
      return 'Unknown User';
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = [];
      for (const transaction of transactions) {
        const sender = await getUsername(transaction.sender);
        const receiver = await getUsername(transaction.receiver);

        data.push({
          ...transaction,
          senderUsername: sender,
          receiverUsername: receiver,
          createdAt: formatDate(transaction.createdAt),
        });
      }
      setTransactionData(data);
    };

    fetchData();
  }, [transactions]);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Amount</TableCell>
          <TableCell>Currency</TableCell>
          <TableCell>Sender</TableCell>
          <TableCell>Receiver</TableCell>
          <TableCell>Date</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {transactionData.map((transaction) => (
          <TableRow key={transaction._id}>
            <TableCell>{transaction.amount}</TableCell>
            <TableCell>{transaction.currency}</TableCell>
            <TableCell>{transaction.senderUsername}</TableCell>
            <TableCell>{transaction.receiverUsername}</TableCell>
            <TableCell>{transaction.createdAt}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TransactionHistory;
