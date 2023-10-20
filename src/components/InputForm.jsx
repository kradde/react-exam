function InputForm({ type, placeholder, register, dataName, rules, errors }) {
    return (
        <>
            <input type={type} {...register(dataName, rules)} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder={placeholder} />
            {errors && errors[dataName]?.type === 'required' && <span className="block text-red-500 mb-2">{errors[dataName]?.message}</span>}
        </>
    );
}

export default InputForm;
