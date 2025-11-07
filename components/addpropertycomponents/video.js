import { useState, useEffect, useRef } from "react";
import VideoPlayer from "../videoplayer/videoplayer";
import { sendVideoToDB } from "@/app/addproperty/[id]/send-data";
import { getVideoPublicIdUrlByPropertyId, getVideoSecureUrlByPropertyId } from "@/app/addproperty/[id]/get-data";
import { deleteVideoFromDB } from "@/app/addproperty/[id]/delete-data";
const Video = (props) => {
    const [uploaded, setUploaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [video, setVideo] = useState(null);
    const [error, setError] = useState('');
    const [propertyId, setPropertyId] = useState(null);
    const [loadingMessage, setLoadingMessage] = useState('');
    const videoInputRef = useRef();
    useEffect(() => {
        return () => { video?.preview && URL.revokeObjectURL(video.preview); }
    }, []);
    useEffect(() => {
        const propertyid = localStorage.getItem("propertyId");
        const getVideoUrl = async (id) => {
            try {
                const res = await getVideoSecureUrlByPropertyId(id);
                console.log(res);
                if (res && res.video) {
                    const vid = { preview: res.video };
                    setVideo(vid);
                    setUploaded(true);
                }
                return res;
            } catch (e) {
                console.log(e);
                return e;
            }
        };
        if (propertyid) {
            setPropertyId(propertyid);
            getVideoUrl(propertyid);
        }
        else {
            localStorage.setItem("currentStep", 1);
        }
    }, []);


    const videoChangeHandler = (event) => {
        const file = event.target.files[0];
        const MAX_SIZE = 100 * 1024 * 1024;
        if (!file.type.startsWith('video/')) {
            setError('الملف ليس فيديو !!');
            return;
        }
        if (file.size > MAX_SIZE) {
            setError('الرجاء رفع فيديو بحجم أقل من 100 MB');
            return;
        }

        if (video && video.file && video.preview) {
            URL.revokeObjectURL(video.preview);
        }
        const url = URL.createObjectURL(file);
        const fullvideo = { file, preview: url }
        setVideo(fullvideo);
        setUploaded(false);
    }
    const uploadVideo = async () => {
        if (!propertyId) {
            setError('لايوجد عقار!!');
            return;
        }
        try {
            setLoading(true);
            setLoadingMessage('جاري رفع الفيديو...');
            const fd = new FormData();
            fd.append("file", video.file);
            fd.append("propertyId", propertyId);
            const res = await fetch('/api/property/upload-video', {
                method: 'POST',
                body: fd
            });
            const data = await res.json();
            console.log(data);
            if (data.secure_url && data.public_id) {
                const sendurl = await sendVideoToDB(data.secure_url, data.public_id, propertyId);
                setVideo({ file: null, preview: data.secure_url });
                setUploaded(true);
                setError('');
                console.log(sendurl);
                props.next();
            }
        } catch (e) {
            console.log("فشل في رفع الفيديو!!", e);
        }
        finally {
            setLoading(false);
            setLoadingMessage('');
        }
    }
    const deleteVid = async () => {
        if (propertyId) {
            setLoading(true);
            setLoadingMessage('جاري حذف الفيديو...');
            const property = await getVideoPublicIdUrlByPropertyId(propertyId);
            if (property.video_public_id) {
                try {
                    const res = await fetch('/api/property/delete-video', {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ public_id: property.video_public_id })
                    });
                    const data = await res.json();
                    console.log(data);
                    if (data.ok && data.response.result !== 'not found') {
                        const deleteFromDB = await deleteVideoFromDB(propertyId);
                        const data = JSON.parse(deleteFromDB.data);
                        console.log(data);
                    }
                    console.log("تم حذف الفيديو من cloudinary و DB");
                    setVideo(null);
                    videoInputRef.current.value = '';
                } catch (e) {
                    console.log(" خطأ أثناء حذف الفيديو:", e);
                }
                finally {
                    setLoading(false);
                    setLoadingMessage('');
                }
            }
        }
        if (video.preview) { URL.revokeObjectURL(video.preview) }
        setVideo(null);
    }
    return <div className="relative">
        <div className="w-[400px] h-[300px] border-gray-500 bg-[#0f2638] rounded-[25px] border-[1px] mx-auto my-25 text-white ">
            <img src="/assets/icons/addvideoicon/video (3).png" className="w-26 h-26 mx-auto mt-10" />
            <input id="videoupload" type="file" accept="video/*" onChange={videoChangeHandler} ref={videoInputRef}
                className="w-[100%] h-[100%] hidden"
            />
            <label htmlFor="videoupload" className="text-center font-bold mx-auto block mt-[10%] text-[16px] border-[1px] border-blue-900 bg-blue-900 hover:bg-[#240091] cursor-pointer py-[12px] w-[70%] rounded-[12px]">اضغط لاختيار فيديو العقار</label>
        </div>

        {video?.preview && <div className="relative p-0">
            <img src="/assets/icons/exit/no.png" className="w-16 h-16 absolute top-0 right-[10%] translate-x-[50%] translate-y-[-50%] z-10 cursor-pointer" onClick={() => { deleteVid() }} />
            <VideoPlayer
                url={video.preview}
                options={{
                    playing: false,
                    loop: false,
                    muted: false
                }} />
        </div>}

        {error && <p className="text-red-500 text-center mb-10">{error}</p>}
        <button type='button' onClick={uploadVideo} disabled={!video || loading || uploaded} className={`text-white py-3 mb-16 px-8 rounded-[8px] ${(video && !loading && !uploaded) ? 'bg-sky-900  hover:bg-sky-700 cursor-pointer' : 'bg-gray-700 cursor-not-allowed'} transition-all duration-300 mx-auto text-[18px] font-bold block`}>
            رفع الفيديو</button>
        {loading && <div className="relative mb-10 flex justify-center flex-col items-center gap-5">
            <div className="text-center w-20 h-20 border-[10px] rounded-[50%] border-sky-950 border-l-0 border-t-0 animate-spin ">
            </div>
            <p className="text-center mb-4 font-bold text-[#240091]">{loadingMessage}</p>
        </div>}
        <div className="flex justify-between">
            <button type='button' onClick={() => { props.next(); }} disabled={uploaded} className={`text-white py-3 mb-32 px-8 rounded-[8px] transition-all duration-300 mx-32 text-[18px] font-bold 
        ${(!uploaded && !loading) ? 'bg-sky-900 hover:bg-sky-700 cursor-pointer' : 'bg-gray-700 cursor-not-allowed'}`}>
                تخطي</button>

            <button type='button' onClick={() => { props.previous(); }} disabled={uploaded} className={`text-white py-3 mb-32 px-8 rounded-[8px] transition-all duration-300 mx-32 text-[18px] font-bold 
        ${(!uploaded && !loading) ? 'bg-sky-900 hover:bg-sky-700 cursor-pointer' : 'bg-gray-700 cursor-not-allowed'}`}>
                العودة إلى الخطوة السابقة</button>
        </div>

    </div>
}
export default Video;