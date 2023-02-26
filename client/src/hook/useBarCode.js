export default function() {
  const scan = async(source)=>{
    try {
      console.log('decoding bar-code')
      
      const res = await window.javascriptBarcodeReader({
        image: source,
        barcode: 'code-2of5',
        // barcodeType: 'industrial',
      })

      console.log('barcode scan', res)

      return res
    } catch (error) {
      console.error(error)
    }
  }


  return {scan}
}
