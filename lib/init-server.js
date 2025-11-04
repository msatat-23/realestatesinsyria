import { startHomeFeedScheduler } from "@/jobs/homeFeedJob";


if (!global.__feedSchedulerStarted) {
    startHomeFeedScheduler();
    global.__feedSchedulerStarted = true;
    console.log("🚀 Feed scheduler started once on server boot");
}
