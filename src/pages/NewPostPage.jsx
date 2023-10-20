import { useForm } from 'react-hook-form';
import InputForm from '../components/InputForm';
import { useNavigate } from 'react-router-dom';
import { usePosts } from '../context/PostsContext';
import OnlineSign from '../components/onlineSign';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NewPostPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { createPost, isOnline } = usePosts();
    const navigate = useNavigate();

    const notify = () =>
        toast.error('No hay acceso a internet', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
        });

    return (
        <div className="bg-zinc-800 sm:container mx-4 sm:mx-auto mt-10 p-5 sm:p-10 rounded-md">
            <h3 className="text-2xl font-bold mb-4">Nueva Entrada</h3>
            <OnlineSign />
            <form
                onSubmit={handleSubmit((values) => {
                    if (!isOnline) {
                        notify();
                        return;
                    }
                    createPost(values);
                    navigate('/');
                })}
            >
                <InputForm type="text" placeholder="Título" register={register} dataName="title" rules={{ required: 'El título es requerido' }} errors={errors} />
                <InputForm type="text" placeholder="Autor" register={register} dataName="author" rules={{ required: 'El autor es requerido' }} errors={errors} />
                <textarea
                    type="text"
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Escribe tu contenido..."
                    rows="6"
                    {...register('content', {
                        required: 'El contenido es requerido',
                        minLength: {
                            value: 10,
                            message: 'Mínimo permitido de 10 caracteres',
                        },
                        maxLength: {
                            value: 2000,
                            message: 'Máximo permitido de 2000 caracteres',
                        },
                    })}
                />
                {errors && errors.content?.type === 'required' && <span className="block text-red-500 mb-2">{errors.content?.message}</span>}
                {errors && errors.content?.type === 'minLength' && <span className="block text-red-500 mb-2">{errors.content?.message}</span>}
                {errors && errors.content?.type === 'maxLength' && <span className="block text-red-500 mb-2">{errors.content?.message}</span>}
                <div>
                    <button
                        type="submit"
                        className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl
                    focus:ring-4 focus:outline-none focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2"
                    >
                        Publicar Entrada
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default NewPostPage;
