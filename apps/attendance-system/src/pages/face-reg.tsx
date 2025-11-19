import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useRef, useEffect, useState } from "react";

function FaceReg() {
  return (
    <div className="flex flex-col justify-center m-[5vw]">
        <Navbar />
        <div className="mt-[5vw]">
            <Face />
        </div>
        
    </div>
  )
}

const Face = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const photoRef = useRef<HTMLCanvasElement | null>(null);
    const [hasPhoto, setHasPhoto] = useState(false);
    const [flash, setFlash] = useState(false);
    const [captureStep, setCaptureStep] = useState<1 | 2 | 3>(1);
    const [photos, setPhotos] = useState<string[]>([]);

    const getVid = () => {
        navigator.mediaDevices.getUserMedia({ video: { width: 1920, height: 1000 }})
        .then(stream => {
            let video = videoRef.current;
            if(!video) return;
            
            video.srcObject = stream;
            video.play();
        })
        .catch(err => {
            console.error(err);
        });
    }

    const takePhoto = () => {
        const width = 414;
        const height = width / (9/16);

        let video = videoRef.current;
        let photo = photoRef.current;
        setFlash(true);
        setTimeout(() => setFlash(false), 300);

        if(!photo) return;

        photo.width = width;
        photo.height = height;

        let ctx = photo.getContext('2d');
        if(!ctx || !video) return;
        ctx.drawImage(video, 0, 0, width, height);

        const dataUrl = photo.toDataURL('image/png');
        setPhotos((prev) => [...prev, dataUrl]);
        
        if(captureStep < 3) {
            setCaptureStep((prev) => (prev + 1) as 1 | 2 | 3);
        } else {
            setHasPhoto(true);
        }
    }
    useEffect(() => {
        getVid();
    }, []);

    const stepLabels = {
        1: "Capture Left → Turn your head left.",
        2: "Capture Right → Turn your head right.",
        3: "Capture Front → Look straight ahead."
    };

    const resetCapture = () => {
        setPhotos([]);
        setCaptureStep(1);
        setHasPhoto(false);
        getVid();
    }
    return(
        <div className=" justify-center">
            <Card className="border rounded-[0vw]">
          <CardHeader>
            <CardTitle className="text-center">Attendance System Face-ID Setup</CardTitle>
            <CardDescription className="text-center">
                <div className="">
                    <p>This biometric profile will be used by our AI system to verify and record your daily attendance accurately.</p>
                    <div className="flex border rounded-md p-[2vw] justify-center items-center ml-[1vw] gap-[1vw] mr-[1vw] mt-[3vw]">
                        <p className="text-left">Click here if your camera did not start automatically.</p>
                        <Button variant={'outline'} className="rounded-[1vw] w-[30vw]" onClick={getVid}>Start Camera</Button>
                    </div>
                </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
                <div className="flex flex-col w-full items-center gap-[3vw]">
                    <div className="rounded-[2vw] relative w-[80%] h-[100vw] overflow-hidden">
                        <video className="w-full rounded-[2vw] object-cover h-full" ref={videoRef}></video>
                        <canvas ref={photoRef} className="hidden"></canvas>
                        {flash && (<div className="absolute inset-0 bg-white opacity-80 rounded-[2vw] transition-opacity"></div>)}
                    </div>
                    <div className="flex justify-center gap-[1vw] mt-[1vw]">
                        
                        <Button variant={'default'} className="rounded-[1vw]" onClick={takePhoto} disabled={captureStep > 3 || hasPhoto}>{stepLabels[captureStep]}</Button>
                    </div>
                    <div className="">
                        {hasPhoto && (
                            <Dialog>
                                <DialogTrigger asChild>
                                <Button variant="default" className="w-[61vw] rounded-[1vw]">Register Face-ID</Button>
                                </DialogTrigger>

                                <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Face-ID Confirmation</DialogTitle>
                                    <DialogDescription>
                                    <div className="text-center">
                                        <p>This facial capture will be used to generate your biometric authentication profile.</p>
                                        <div className="flex gap-[4vw] overflow-x-scroll h-[90vw]">
                                            {photos.map((p, i) => (
                                                <img key={i} src={p} className="h-[80vw] rounded-md border" />
                                            ))}
                                        </div>
                                    </div>
                                    <DialogClose asChild className="mt-[10vw]">
                                        <div className="flex justify-center gap-[3vw]">
                                            <Button variant="outline" className="bg-red-500 text-white" onClick={resetCapture}>Retake FaceID</Button>
                                            <Button variant="default" className="bg-green-500">Submit FaceID</Button>
                                        </div>
                                    </DialogClose>
                                    </DialogDescription>
                                </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        )}
                    </div>
                </div>
            </div>
          </CardContent>
        </Card>
        </div>
    );
}
export default FaceReg;