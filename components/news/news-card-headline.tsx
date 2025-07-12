export function NewsCardHeadline({ headline }: { headline: string }) {
    return (
        <h2 className="text-sm text-left md:text-base font-bold text-white line-clamp-3 leading-tight group-hover:underline transition-all duration-200 decoration-2 underline-offset-2">
            {headline}
        </h2>
    )
}