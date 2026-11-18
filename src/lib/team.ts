import { getCollection, type CollectionEntry } from 'astro:content';

export type TeamCategory = CollectionEntry<'team'>['data']['category'];

// Ordem e rótulos das seções da página Equipe.
export const teamCategories: { id: TeamCategory; label: string }[] = [
    { id: 'lideranca', label: 'Liderança' },
    { id: 'gestores', label: 'Gestores' },
    { id: 'programacao', label: 'Programação' },
    { id: 'eletronica', label: 'Eletrônica' },
    { id: 'montagem', label: 'Montagem' },
    { id: 'marketing', label: 'Marketing' },
];

/** Membros agrupados por categoria, na ordem do campo `order`; categorias vazias são omitidas. */
export async function getTeamByCategory() {
    const members = (await getCollection('team')).sort((a, b) => a.data.order - b.data.order);
    return teamCategories
        .map((category) => ({ ...category, members: members.filter((m) => m.data.category === category.id) }))
        .filter((group) => group.members.length > 0);
}
