export async function uploadImage(file: File) {
  try {
    const response = await fetch(
      "https://www.filestackapi.com/api/store/S3?key=ATmxns9QQ2OhhpR6rmotZz",
      {
        method: "POST",
        headers: {
          "Content-Type": "image/png",
        },
        body: file,
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}
