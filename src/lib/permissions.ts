import { SubscriptionLevel } from "./subscription";

export function canCreateResume(
    subscriptionLevel: SubscriptionLevel,
    currentResumeCount: number
) {
    const mapResumeMap: Record<SubscriptionLevel, number> = {
        free: 1,
        pro: 3,
        plus: Infinity,
    }

    const maxResumes = mapResumeMap[subscriptionLevel];

    return currentResumeCount < maxResumes;
}

export function canUseAITools(subscriptionLevel: SubscriptionLevel) {
    return subscriptionLevel !== "free";
}

export function canUseCustomizations(subscriptionLevel: SubscriptionLevel) {
    return subscriptionLevel === "plus";
}

