"use client";
import React, { Fragment } from "react";
import { useState } from "react";
import classes from "./payment.module.css";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
export default function PaymentPage({ searchParams }) {
    const plan = React.use(searchParams)?.plan || "الاشتراك المميز";

    const [selectedMethod, setSelectedMethod] = useState(null);
    const [receiptFile, setReceiptFile] = useState(null);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [loading, setloading] = useState(false);
    const handlePaymentMethod = (method) => {
        setSelectedMethod(method);
        setSuccess(false);
        setError("");
        setReceiptFile(null);
    };

    const handleFileChange = (e) => {
        setReceiptFile(e.target.files[0]);
        setError("");
    };

    const handleSubmit = async () => {
        if (!receiptFile) {
            setError("يرجى رفع صورة إيصال الدفع.");
            return;
        }
        const formData = new FormData();
        formData.append('type', plan ?? '');
        if (receiptFile instanceof File) {
            formData.append('image', receiptFile);
        }
        try {
            setloading(true);
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:8000/api/subscription-requests',
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                    , body: formData
                }
            );
            if (res.ok) {
                console.log('نجاح الطلب');
                setSuccess(true);
                setloading(false);
            }
        } catch {
            console.log('فشل الطلب');
            setloading(false);
        }
        setError("");
    };

    return (
        <Fragment>
            <Navbar mainpage={false} />
            <div className={classes.container}>
                <h1 className={classes.title}>الدفع لاشتراك: {plan}</h1>
                <p className={classes.subtitle}>اختر طريقة الدفع المناسبة:</p>

                {!selectedMethod ? (
                    <div className={classes.buttons}>
                        <button
                            className={classes.button}
                            onClick={() => handlePaymentMethod("سيريتل كاش")}
                        >
                            الدفع عبر سيريتل كاش
                        </button>
                        <button
                            className={classes.button}
                            onClick={() => handlePaymentMethod("MTN كاش")}
                        >
                            الدفع عبر MTN كاش
                        </button>
                    </div>
                ) : (
                    <div className={classes.paymentSection}>
                        <p className={classes.selectedMethod}>
                            تم اختيار: <strong>{selectedMethod}</strong>
                        </p>

                        <p className={classes.walletNumber}>
                            رقم المحفظة:{" "}
                            <strong>
                                {selectedMethod === "سيريتل كاش" ? "0988123456" : "0933123456"}
                            </strong>
                        </p>

                        <label className={classes.uploadLabel}>
                            قم برفع صورة إيصال الدفع:
                            <input
                                type="file"
                                accept="image/*"
                                className={classes.input}
                                onChange={handleFileChange}
                            />
                        </label>

                        {error && <p className={classes.error}>{error}</p>}

                        <div className={classes.buttons}>
                            <button className={classes.button} onClick={handleSubmit}>
                                تأكيد الدفع
                            </button>
                            <button
                                className={`${classes.button} ${classes.cancelButton}`}
                                onClick={() => setSelectedMethod(null)}
                            >
                                تغيير الطريقة
                            </button>
                        </div>
                    </div>
                )}

                {success && (
                    <div className={classes.successMessage}>
                        تم إرسال إيصال الدفع بنجاح! سيتم تفعيل اشتراكك خلال فترة قصيرة.
                    </div>
                )}
                {loading && (
                    <div className={classes.overlay}>
                        <div className={classes.spinner}></div>
                        <p>جار التحميل...</p>
                    </div>
                )}
            </div>
            <Footer />
        </Fragment>
    );
}
