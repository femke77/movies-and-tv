

const Chip = ({ label }: { label: string }) => {
    return (
        <div className="text-center rounded-md bg-white/20 py-0.5 px-2.5 border border-transparent text-sm text-white transition-all shadow-sm w-max">
            {label}
        </div>
    );
}

export default Chip;