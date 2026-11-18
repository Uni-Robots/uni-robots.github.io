import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Um .yaml por membro, ao lado da foto. Foto faltando ou com nome errado = build falha.
const team = defineCollection({
    loader: glob({ pattern: '*.yaml', base: './src/content/team' }),
    schema: ({ image }) =>
        z.object({
            name: z.string(),
            role: z.string(),
            category: z.enum(['lideranca', 'gestores', 'programacao', 'eletronica', 'montagem', 'marketing']),
            order: z.number(),
            photo: image(),
            linkedin: z.url().optional(),
            github: z.url().optional(),
        }),
});

// Um .yaml por patrocinador, ao lado do logo.
const sponsors = defineCollection({
    loader: glob({ pattern: '*.yaml', base: './src/content/sponsors' }),
    schema: ({ image }) =>
        z.object({
            name: z.string(),
            alt: z.string(),
            logo: image(),
            description: z.string(),
            order: z.number(),
        }),
});

const projects = defineCollection({
    loader: file('./src/content/projects.json'),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string(), // nome de um arquivo em src/icons/ (sem .svg)
        order: z.number(),
        easterEgg: z.boolean().default(false), // ativa o "Protocolo Resenha" ao clicar
    }),
});

export const collections = { team, sponsors, projects };
