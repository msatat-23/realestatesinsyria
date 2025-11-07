"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import classes from './subplans.module.css';

const plans = [
    {
        title: "الاشتراك المجاني",
        price: 0,
        currency: "ل.س",
        features: ["نشر إعلانك على الموقع"],
        disabled: true,
    },
    {
        title: "الاشتراك المميز",
        price: 50000,
        currency: "ل.س",
        features: [
            "إظهار الإعلان على الصفحة الرئيسية",
            "مشاركة إعلانك على صفحات التواصل الخاصة بالموقع"
        ],
        disabled: false,
    },
    {
        title: "الاشتراك الحصري",
        price: 100000,
        currency: "ل.س",
        features: [
            "إظهار الإعلان على الصفحة الرئيسية",
            "مشاركة إعلانك على صفحات التواصل الخاصة بالموقع",
            "أولوية الظهور عند البحث"
        ],
        disabled: false,
    },
];

export default function SubscriptionPlans() {
    const [selectedPlan, setSelectedPlan] = useState("الاشتراك المجاني");
    const router = useRouter();

    const handleSelect = (plan) => {
        if (!plan.disabled) {
            setSelectedPlan(plan.title);
            if (plan.price > 0) {
                router.push(`/payment?plan=${plan.title}`);
            }
        }
    };

    return (
        <div className={classes.container}>
            <h1 className={classes.title}>اختر نوع الاشتراك</h1>
            <div className={classes.grid}>
                {plans.map((plan) => (
                    <div
                        key={plan.title}
                        className={`${classes.card} ${selectedPlan === plan.title ? classes.selected : ''}`}
                    >
                        <div>
                            <h2 className={classes.cardTitle}>{plan.title}</h2>
                            <p className={classes.price}>
                                {plan.price.toLocaleString()} {plan.currency}
                            </p>
                            <ul className={classes.features}>
                                {plan.features.map((feature, idx) => (
                                    <li key={idx}> {feature}</li>
                                ))}
                            </ul>
                        </div>
                        <button
                            onClick={() => handleSelect(plan)}
                            disabled={plan.disabled}
                            className={`${classes.button} ${plan.disabled ? classes.disabled : ''
                                }`}
                        >
                            {plan.disabled ? "مشترك افتراضياً" : "اشترك الآن"}
                        </button>
                    </div>
                ))}
            </div>
            <div className={classes.note}>الاشتراك شهري</div>
        </div>
    );
}
