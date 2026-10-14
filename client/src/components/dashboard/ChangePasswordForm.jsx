import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiLock } from 'react-icons/fi';
import api from '../../services/api';

const ChangePasswordForm = () => {
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const newPassword = watch('newPassword');

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      await api.post('/auth/change-password', {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });

      setSuccess('Mot de passe modifié avec succès');
      reset();
    } catch (err) {
      console.error('Erreur lors du changement de mot de passe:', err);
      setError(err.response?.data?.message || 'Erreur lors du changement de mot de passe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card p-6 rounded-xl">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-designColor/10 flex items-center justify-center">
          <FiLock className="text-designColor" size={20} />
        </div>
        <h3 className="text-xl font-semibold text-textColor">
          Changer le mot de passe
        </h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {success && (
          <div className="bg-green-500/10 border border-green-500/50 text-green-400 px-4 py-3 rounded-lg text-sm">
            {success}
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-textColor mb-2">
            Ancien mot de passe *
          </label>
          <input
            type="password"
            {...register('oldPassword', { required: 'L\'ancien mot de passe est requis' })}
            className="w-full px-4 py-2 bg-bodyColor border border-designColor/20 rounded-lg text-textColor focus:outline-none focus:border-designColor/50"
            placeholder="Entrez votre ancien mot de passe"
          />
          {errors.oldPassword && (
            <p className="text-red-400 text-sm mt-1">{errors.oldPassword.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-textColor mb-2">
            Nouveau mot de passe *
          </label>
          <input
            type="password"
            {...register('newPassword', {
              required: 'Le nouveau mot de passe est requis',
              minLength: {
                value: 6,
                message: 'Le mot de passe doit contenir au moins 6 caractères',
              },
            })}
            className="w-full px-4 py-2 bg-bodyColor border border-designColor/20 rounded-lg text-textColor focus:outline-none focus:border-designColor/50"
            placeholder="Entrez votre nouveau mot de passe"
          />
          {errors.newPassword && (
            <p className="text-red-400 text-sm mt-1">{errors.newPassword.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-textColor mb-2">
            Confirmer le nouveau mot de passe *
          </label>
          <input
            type="password"
            {...register('confirmPassword', {
              required: 'Veuillez confirmer votre mot de passe',
              validate: (value) =>
                value === newPassword || 'Les mots de passe ne correspondent pas',
            })}
            className="w-full px-4 py-2 bg-bodyColor border border-designColor/20 rounded-lg text-textColor focus:outline-none focus:border-designColor/50"
            placeholder="Confirmez votre nouveau mot de passe"
          />
          {errors.confirmPassword && (
            <p className="text-red-400 text-sm mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-6 bg-designColor hover:bg-designColor/90 text-bodyColor font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Modification...' : 'Modifier le mot de passe'}
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
