import { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  // state for QR code data is initially null when QR is not yet scanned
  const [qrData, setQrData] = useState("");

  // function to handle scan operation takes in data from scanned code
  const handleScan = (data) => {
    // if data, update state
    if (data) {
      setQrData(data?.text);
    }
  };

  // catch errors
  const handleError = (err) => {
    console.error(err);
  };

  // check if state updates
  console.log(qrData, "the QR code data from state");

  // split the string by commas
  const stringParts = qrData?.split("o0o");

  // create an object and assign the values
  const objData = {
    patient_name: stringParts[0],
    doctor: stringParts[1],
    hospital: stringParts[2],
    date: stringParts[3],
    time: stringParts[4],
    complaint: stringParts[5],
    gender: stringParts[6],
    address: stringParts[7],
    status: stringParts[8],
  };

  return (
    <>
      <Head>
        <title>NEXTGEN Doctors</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <section className="flex flex-col items-center justify-start bg-[#00444d] text-white text:lg sm:text-3xl w-full min-h-screen gap-5">
          {/* scanner container div, holds camera feed */}
          <div
            id="scanner-container"
            playsInline
            className="w-full sm:h-[100vh] p-6"
          >
            {/* camera feed */}
            <QrReader
              delay={300}
              onError={handleError}
              onScan={handleScan}
              onResult={(result) => handleScan(result)}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <Link
            className="text-[#00444d] w-1/3 sm:w-1/4 rounded-lg bg-white h-10 sm:h-20 flex flex-row items-center justify-center font-semibold"
            href={"/"}
            onClick={() => stopScanner()}
          >
            Back Home
          </Link>
          <br />
          {qrData === "" ? (
            ""
          ) : (
            <div className="w-[90%] bg-white p-4 text-black flex flex-col gap-4 items-start rounded-lg justify-center text-sm sm:text-xl">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "center",
                }}
              >
                <h1>
                  <b>Patient Name:</b> {objData?.patient_name}
                </h1>
                <h1>
                  <b>Specialist:</b> {objData?.doctor}
                </h1>
                <h1>
                  <b>Hospital:</b> {objData?.hospital}
                </h1>
                <h1>
                  <b>Appointment Date:</b> {objData?.date}
                </h1>
                <h1>
                  <b>Appointment Time:</b> {objData?.time}
                </h1>
                <h1>
                  <b>Complaint:</b> {objData?.complaint}
                </h1>
                <h1>
                  <b>Gender:</b> {objData?.gender}
                </h1>
                <h1>
                  <b>Address:</b> {objData?.address}
                </h1>
                <h1>
                  <b>Appointment Status:</b> {objData?.status}
                </h1>
              </div>
              <div className="w-full flex flex-row items-center justify-center">
                <button className="bg-[#00444d] text-white w-1/2 sm:w-1/4 h-10 sm:h-16 rounded-lg">
                  view more
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
