import { formatDate } from "@/lib/utils/date-utils";

export function NewsCardMetadata({ source, datetime }: { source: string; datetime: number }) {
    return (
        <div className="w-full flex items-center justify-between mb-2 text-xs text-white text-opacity-70">
            <span className="font-medium uppercase tracking-wide truncate">{source || "Unknown Source"}</span>
            <time dateTime={new Date(datetime * 1000).toISOString()} className="uppercase whitespace-nowrap ml-2">
                {formatDate(datetime)}
            </time>
        </div>
    )
}