import { useState } from "react";
import { Form } from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Card, Button } from "react-bootstrap";
import DataTable from "react-data-table-component";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      text: "Algo Time Comparison",
    },
  },
};

export default function AlgoCalc() {
  const [dataLength, setDataLength] = useState(1);
  const [algoType, setAlgoType] = useState("");
  const [message, setMessage] = useState("");
  const [colorShow, setColorShow] = useState();
  const [bubbleTime, setBubbleTime] = useState();
  const [mergeTime, setMergeTime] = useState();
  const [insertionTime, setInsertionTime] = useState();
  const [quickSortTime, setQuickSortTime] = useState();
  const [bubbleSteps, setBubbleSteps] = useState();
  const [mergeSteps, setMergeSteps] = useState();
  const [insertionSteps, setInsertionSteps] = useState();
  const [quickSteps, setQuickSteps] = useState();
  let bubbleArray = [];
  let mSArray = [];
  let starterArray = [];
  let insertionArray = [];
  let quickSortArray = [];
  let mergeSortExecutionTime;
  let bubbleSortExecutionTime;
  let insertionSortExecutionTime;
  let quickSortExecutionTime;
  let bubbleCounter = 0;
  let mergeSortMergeCounter = 0;
  let mergeSortSortCounter = 0;
  let insertionCounter = 0;
  let QuickSortCounter = 0;

  const tableColumns = [
    {
      name: "Algo Name",
      selector: (row) => row.algoName,
      sortable: true,
    },
    {
      name: "Time to Completion (in milliseconds)",
      selector: (row) => row.time,
      sortable: true,
    },
    {
      name: "Operations",
      selector: (row) => row.steps,
      sortable: true,
    },
  ];

  const tableData = [
    {
      id: 1,
      algoName: "Insertion Sort",
      time: insertionTime,
      steps: insertionSteps,
    },
    {
      id: 2,
      algoName: "Merge Sort",
      time: mergeTime,
      steps: mergeSteps,
    },
    {
      id: 3,
      algoName: "Bubble Sort",
      time: bubbleTime,
      steps: bubbleSteps,
    },
    {
      id: 3,
      algoName: "Quick Sort",
      time: quickSortTime,
      steps: quickSteps,
    },
  ];

  const labels = ["Insertion Sort", "Merge Sort", "Bubble Sort", "Quick Sort"];
  const data = {
    labels,
    datasets: [
      {
        label: "Execution Time (In Milliseconds)",
        data: [insertionTime, mergeTime, bubbleTime, quickSortTime],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(100, 99, 132, 0.5)",
          "rgba(50, 99, 132, 0.5)",
          "rgba(50, 199, 32, 0.5)",
        ],
      },
    ],
  };

  const createArray = (length) => {
    starterArray = Array.from({ length: length }, () =>
      Math.floor(Math.random() * length)
    );
    return starterArray;
  };

  const swap = (arr, left, right) => {
    const temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
  };

  const partitionHigh = (arr, low, high) => {
    //Pick the first element as pivot
    let pivot = arr[high];
    let i = low;

    //Partition the array into two parts using the pivot
    for (let j = low; j < high; j++) {
      if (arr[j] <= pivot) {
        swap(arr, i, j);
        i++;
      }
    }

    swap(arr, i, high);

    //Return the pivot index
    return i;
  };

  const iterativeQuickSort = (arr) => {
    //Stack for storing start and end index
    let stack = [];

    //Get the start and end index
    let start = 0;
    let end = arr.length - 1;

    //Push start and end index in the stack
    stack.push({ x: start, y: end });

    //Iterate the stack
    while (stack.length) {
      //Get the start and end from the stack
      const { x, y } = stack.shift();

      //Partition the array along the pivot
      const PI = partitionHigh(arr, x, y);

      //Push sub array with less elements than pivot into the stack
      if (PI - 1 > x) {
        stack.push({ x: x, y: PI - 1 });
      }

      //Push sub array with greater elements than pivot into the stack
      if (PI + 1 < y) {
        stack.push({ x: PI + 1, y: y });
      }
    }
  };

  // const quickSort = (Array,start,end) =>{
  //   //Base Case
  //   if (start >= end){
  //     return;
  //   }
  //   //returns pivotIndex
  //   let index = partition(Array,start,end);
  //   //Recursively apply the same logic to the left and right subarrays
  //   QuickSortCounter++;
  //   quickSort(Array, start, index-1);
  //   quickSort(Array, index+1,end);
  // }

  const bubbleSort = (Array) => {
    let length = Array.length;
    let arr = Array;
    let swapped;
    do {
      swapped = false;
      for (let i = 0; i < length; i++) {
        // if the left element is less than right element
        if (arr[i] > arr[i + 1]) {
          //temp element equal left element
          let tmp = arr[i];
          //set left element to the value of right element
          arr[i] = arr[i + 1];
          //set right element to value of tmp(the original left element)
          arr[i + 1] = tmp;
          bubbleCounter++;
          //change swapped to true to trigger process again
          swapped = true;
        }
      }
    } while (swapped);
    return arr;
  };

  const merge = (left, right) => {
    let arr = [];
    //while arrays are not empty
    while (left.length && right.length) {
      //pick smaller among the elements of left and right array
      if (left[0] < right[0]) {
        arr.push(left.shift());
        mergeSortSortCounter++;
      } else {
        arr.push(right.shift());
        mergeSortSortCounter++;
      }
    }
    return [...arr, ...left, ...right];
  };

  const mergeSort = (Array) => {
    const half = Array.length / 2;
    //Terminating/Base Case
    if (Array.length < 2) {
      return Array;
    }
    const left = Array.splice(0, half);
    mergeSortMergeCounter++;
    return merge(mergeSort(left), mergeSort(Array));
  };

  const insertionSort = (Array) => {
    // console.log('inserting')
    let length = Array.length;
    for (let i = 1; i < length; i++) {
      //choose first element in unsorted Array
      let current = Array[i];
      //last eleent in unsorted array
      let j = i - 1;
      while (j > -1 && current < Array[j]) {
        Array[j + 1] = Array[j];
        j--;
        insertionCounter++;
      }
      Array[j + 1] = current;
    }
    return Array;
  };
  const colorArray = (array) => {
    array.map((x, idx) => {
      // console.log(x)
    });
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    const formInfo = {
      dataLength: dataLength,
      algoType: algoType,
    };
    createArray(dataLength);

    if (algoType === "All") {
      const bubbleStart = performance.now();
      bubbleArray = [...starterArray];
      bubbleSort(bubbleArray);
      bubbleSortExecutionTime = (performance.now() - bubbleStart).toFixed(2);
      setBubbleTime(bubbleSortExecutionTime);
      setBubbleSteps(bubbleCounter)

      const mergeStart = performance.now();
      mSArray = [...starterArray];
      let sortedData = mergeSort(mSArray);
      mergeSortExecutionTime = (performance.now() - mergeStart).toFixed(2);
      setMergeTime(mergeSortExecutionTime);
      setMergeSteps(mergeSortMergeCounter)

      const quickSortStart = performance.now();
      quickSortArray = [...starterArray];
      iterativeQuickSort(quickSortArray, 0, quickSortArray.length - 1);
      quickSortExecutionTime = (performance.now() - quickSortStart).toFixed(2);
      setQuickSortTime(quickSortExecutionTime);
      setQuickSteps(QuickSortCounter)

      const insertionStart = performance.now();
      insertionArray = [...starterArray];
      insertionSort(insertionArray);
      // console.log(insertionArray);
      // console.log(insertionCounter)
      insertionSortExecutionTime = (performance.now() - insertionStart).toFixed(
        2
      );
      setInsertionTime(insertionSortExecutionTime);
      setInsertionSteps(insertionCounter)

      setColorShow(colorArray(starterArray));
      console.log(colorShow);
      setMessage(
        `Bubble Sort sorted data in ${bubbleSortExecutionTime} milliseconds and in ${bubbleCounter.toLocaleString(
          "en-US"
        )} swaps. Merge Sort sorted the data in ${mergeSortExecutionTime} milliseconds in ${mergeSortSortCounter.toLocaleString(
          "en-US"
        )} sorts. Insertion Sort sorted the data in ${insertionSortExecutionTime} milliseconds and in ${insertionCounter.toLocaleString(
          "en-US"
        )} insertions `
      );
    }
  };

  return (
    <div className="CalcHomePage">
      <h3 className="CalcTitle">Welcome to Algo Calc App</h3>

      <Card className="CalcForm mx-auto">
        <Card.Header>Arguments</Card.Header>
        <form onSubmit={handleSumbit}>
          <input
            id="data-array-length"
            type="number"
            onChange={(e) => setDataLength(e.target.value.replace(/\D/, ""))}
            placeholder="Max of 50,000"
            label="Size of data"
            max="75000"
            value={dataLength}
          />

          <br />

          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setAlgoType(e.target.value)}
          >
            <option>Select Algo Type</option>
            <option value="MergeSort">Merge Sort</option>
            <option value="QuickSort">Quick Sort</option>
            <option value="BubbleSort">Bubble Sort</option>
            <option value="InsertionSort">Insertion Sort</option>
            <option value="All">All</option>
          </Form.Select>
          <br />
          <input type="submit" value="Start Sort" />
        </form>
      </Card>

      {/* {starterArray.length >1 ? {colorShow}:'hey'} */}

      <Card className="text-center mx-auto GraphCard">
        <Card.Header>Algo Performance</Card.Header>
        <Card.Body>
          <Bar options={options} data={data} />
        </Card.Body>
      </Card>
      <Card className="AlgoData">
        {message}
        <DataTable columns={tableColumns} data={tableData} />
      </Card>
    </div>
  );
}
