import { useState } from "react";
import { Form } from "react-bootstrap";

export default function AlgoCalc() {
  const [dataLength, setDataLength] = useState(1);
  const [algoType, setAlgoType] = useState("");
  const [message, setMessage] = useState("");
  let bubbleArray = [];
  let mSArray = [];
  let starterArray = [];
  let insertionArray = [];
  let mergeSortExecutionTime;
  let bubbleSortExecutionTime;
  let insertionSortExecutionTime;
  let bubbleCounter = 0;
  let mergeSortMergeCounter = 0;
  let mergeSortSortCounter = 0;
  let insertionCounter = 0;

  const createArray = (length) => {
    starterArray = Array.from({ length: length }, () =>
      Math.floor(Math.random() * length)
    );
    return starterArray;
  };

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
    console.log('inserting')
    let length = Array.length;
    for(let i = 1; i < length; i++) {
      //choose first element in unsorted Array
      let current = Array[i];
      //last eleent in unsorted array
      let j = i - 1;
      while ((j > -1) && (current < Array[j])) {
        Array[j + 1] = Array[j];
        j--;
        insertionCounter++;
      }
      Array[j + 1] = current;
    }
    return Array;
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    const formInfo = {
      dataLength: dataLength,
      algoType: algoType,
    };
    createArray(dataLength);
    if (algoType === "BubbleSort") {
      const start = performance.now();
      bubbleArray = [...starterArray];
      bubbleSort(bubbleArray);
      bubbleSortExecutionTime = performance.now() - start;
      setMessage(
        ` Sorted ${starterArray.length} values with  ${algoType}. Your unsorted data is ${starterArray} and your sorted data is ${bubbleArray}. It took ${algoType} ${bubbleCounter} swaps. Bubble Sort sorted ${starterArray.length} values in ${bubbleSortExecutionTime} milliseconds`
      );
    }

    if (algoType === "MergeSort") {
      const start = performance.now();
      mSArray = [...starterArray];
      let sortedData = mergeSort(mSArray);
      mergeSortExecutionTime = performance.now() - start;
      setMessage(
        ` Sorted ${starterArray.length} values with  ${algoType}. Your unsorted data is ${starterArray} and your sorted data is ${sortedData}. It took ${algoType} ${mergeSortSortCounter} Sorts and ${mergeSortMergeCounter} merges. Merge Sort sorted ${starterArray.length} values in ${mergeSortExecutionTime} milliseconds`
      );
    }

    if (algoType === "InsertionSort") {
      const start = performance.now();
      insertionArray = [...starterArray];
      insertionSort(insertionArray);
      console.log(insertionArray);
      console.log(insertionCounter)
      insertionSortExecutionTime = performance.now() - start;
      setMessage(
        ` Sorted ${starterArray.length} values with  ${algoType}. Your unsorted data is ${starterArray} and your sorted data is ${insertionArray}. It took ${algoType} ${insertionCounter} insertions. Insertion Sort sorted ${starterArray.length} values in ${insertionSortExecutionTime} milliseconds`
      );
    }
  };

  return (
    <div>
      <h3>Welcome to Algo Calc App</h3>

      <form onSubmit={handleSumbit}>
        <input
          id="data-array-length"
          type="number"
          onChange={(e) => setDataLength(e.target.value.replace(/\D/, ""))}
          placeholder="Max of 9999"
          label="Size of data"
          max="9999"
          value={dataLength}
        />

        <br />

        <Form.Select
          aria-label="Default select example"
          onChange={(e) => setAlgoType(e.target.value)}
        >
          <option>Select Algo Type</option>
          <option value="MergeSort">Merge Sort</option>
          <option value="BinarySearch">Binary Search</option>
          <option value="QuickSort">Quick Sort</option>
          <option value="BubbleSort">Bubble Sort</option>
          <option value="InsertionSort">Insertion Sort</option>
        </Form.Select>
        <br />
        <input type="submit" value="sumbit" />
      </form>

      {message}
    </div>
  );
}
