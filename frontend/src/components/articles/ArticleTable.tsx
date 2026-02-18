import { Article } from "../../types/article";
import { articleService } from "../../services/article.service";

interface Props {
  articles: Article[];
  onRefresh: () => void;
}

export default function ArticleTable({ articles, onRefresh }: Props) {
  const handleDelete = async (id: string) => {
    await articleService.delete(id);
    onRefresh();
  };

  const handlePublish = async (id: string) => {
    await articleService.updateStatus(id, "published");
    onRefresh();
  };

  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2">Titre</th>
          <th className="p-2">Statut</th>
          <th className="p-2">Réseau</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {articles.map((article) => (
          <tr key={article.id} className="border-t">
            <td className="p-2">{article.title}</td>
            <td className="p-2">{article.status}</td>
            <td className="p-2">{article.network}</td>
            <td className="p-2 space-x-2">
              <button
                onClick={() => handlePublish(article.id)}
                className="text-blue-500"
              >
                Publier
              </button>
              <button
                onClick={() => handleDelete(article.id)}
                className="text-red-500"
              >
                Supprimer
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
