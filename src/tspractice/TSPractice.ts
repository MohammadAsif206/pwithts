export  class TSPractice {
  arr: number[];

  constructor(arr: number[]) {
    this.arr = arr;
  }

  bubbleSort(): number[] {
    for (let i = 0; i < this.arr.length; i++) {
      for (let j = 0; j < this.arr.length - 1; j++) {
        if (this.arr[j] > this.arr[j + 1]) {
          const temp = this.arr[j];
          this.arr[j] = this.arr[j + 1];
          this.arr[j + 1] = temp;
        }
      }
    }

    return this.arr;
  }
  flattenNestedArr(arr:any[]): any[]{
    const result: any[] = [];
    for(let i = 0; i<arr.length; i++){
        const item = arr[i];
        if(typeof(item)==="object" && item !== null && item.length !== undefined){
            const flattItem = this.flattenNestedArr(item);
            for(let j = 0; j<flattItem.length;j++){
                result[result.length] = flattItem[j];
            }
        } else{
            result[result.length]=item;
        }
        
    }
    return result;
  }
}