import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import api from '../../services/api';
import AnimatedButton from '../common/AnimatedButton';
import LoadingSpinner from '../common/LoadingSpinner';

const ContactForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      setSubmitError('');

      await api.post('/messages', data);

      setSubmitSuccess(true);
      reset();

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);

      if (error.response?.status === 429) {
        setSubmitError("Vous avez atteint la limite d'envoi. Veuillez réessayer plus tard.");
      } else {
        setSubmitError(
          error.response?.data?.message ||
            "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer."
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass-card"
    >
      {submitSuccess ? (
        <div className="text-center py-12">
          <div className="text-designColor text-5xl mb-4">✓</div>
          <h3 className="text-2xl font-titleFont font-bold text-designColor mb-2">
            Message envoyé !
          </h3>
          <p className="text-textColor/80">
            Merci pour votre message. Je vous répondrai dans les plus brefs délais.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-textColor mb-2 text-sm font-medium">
              Nom complet *
            </label>
            <input
              id="name"
              type="text"
              className={`w-full bg-bodyColor/50 border-2 px-4 py-3 rounded-lg text-textColor outline-none transition-colors ${
                errors.name
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-white/20 focus:border-designColor'
              }`}
              placeholder="Votre nom"
              {...register('name', { required: 'Le nom est requis' })}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-textColor mb-2 text-sm font-medium">
              Email *
            </label>
            <input
              id="email"
              type="email"
              className={`w-full bg-bodyColor/50 border-2 px-4 py-3 rounded-lg text-textColor outline-none transition-colors ${
                errors.email
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-white/20 focus:border-designColor'
              }`}
              placeholder="votre.email@example.com"
              {...register('email', {
                required: "L'email est requis",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Format d'email invalide",
                },
              })}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-textColor mb-2 text-sm font-medium">
              Message *
            </label>
            <textarea
              id="message"
              rows="5"
              className={`w-full bg-bodyColor/50 border-2 px-4 py-3 rounded-lg text-textColor outline-none transition-colors resize-none ${
                errors.message
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-white/20 focus:border-designColor'
              }`}
              placeholder="Votre message..."
              {...register('message', {
                required: 'Le message est requis',
                minLength: {
                  value: 10,
                  message: 'Le message doit contenir au moins 10 caractères',
                },
              })}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
            )}
          </div>

          {/* Error Message */}
          {submitError && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-500 text-sm">{submitError}</p>
            </div>
          )}

          {/* Submit Button */}
          <AnimatedButton
            type="submit"
            variant="primary"
            disabled={submitting}
            className="w-full md:w-auto"
          >
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <LoadingSpinner size="sm" />
                Envoi en cours...
              </span>
            ) : (
              'Envoyer le message'
            )}
          </AnimatedButton>
        </form>
      )}
    </motion.div>
  );
};

export default ContactForm;
