type PageHeaderProps = {
    title: string;
    subtitle?: string;
};
export default function PageHeader({
    title,
    subtitle,
}:PageHeaderProps) {
    return (
        <div className="space-y-1">
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
                {title}
            </h1>

            {subtitle ? (
                <p className="text-sm text-gray-600">{subtitle}</p>
            ) : null}
        </div>
    );
}