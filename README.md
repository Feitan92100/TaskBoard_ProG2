# TaskBoardProG2

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.21.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Commandes utilisées

### Création des composants
- `ng generate component home`
- `ng generate component about`

### Configuration du routage
Les routes ont été ajoutées dans le fichier `app.routes.ts` :
```typescript
export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
```

### Configuration des providers
Les routes sont fournies dans le fichier `app.config.ts` :
```typescript
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};
```

## Routes fonctionnelles
- `/home` : Page d'accueil
- `/about` : Page "À propos"

---

## Séquence 2 – Logique réactive du flux de données

### 1. Concepts compris
- **Programmation réactive** : Les données circulent sous forme de flux (streams) plutôt que d'être récupérées manuellement.
- **Observables et Observers** : Le service émet des données, les composants s'abonnent pour les recevoir.
- **Réactivité automatique** : Quand les données changent dans le service, tous les composants abonnés se mettent à jour automatiquement.
- **Gestion du cycle de vie** : Angular gère automatiquement les abonnements et désabonnements avec le pipe `async`.

### 2. Rôle du BehaviorSubject
- **BehaviorSubject** est un type spécial d'Observable qui :
  - **Stocke une valeur actuelle** : Garde toujours la dernière valeur émise en mémoire.
  - **Émet immédiatement** : Donne la valeur actuelle dès qu'on s'abonne (contrairement à un Observable classique).
  - **Permet de pousser de nouvelles valeurs** : Utilise `.next()` pour diffuser des mises à jour à tous les abonnés.
- Dans `TaskService`, `taskSubject` est un BehaviorSubject qui stocke la liste des tâches et notifie tous les composants abonnés à chaque modification.

### 3. Rôle du pipe `| async`
- **Abonnement automatique** : Le pipe `async` s'abonne automatiquement à l'Observable dans le template.
- **Désabonnement automatique** : Quand le composant est détruit, le pipe se désabonne automatiquement (évite les fuites mémoire).
- **Affichage direct** : Extrait la valeur de l'Observable et la rend disponible dans le template sans gérer manuellement les subscriptions.
- **Syntaxe** : `@if (tasks$ | async; as tasks)` récupère la liste et la stocke dans la variable locale `tasks`.

### 4. Flux Service → Composant → Template

#### **Étape 1 : Service (TaskService)**
```typescript
private taskSubject = new BehaviorSubject(this.tasks);  // Crée le flux
tasks$ = this.taskSubject.asObservable();                // Expose le flux en lecture seule

addTask(task) {
  this.tasks = [...this.tasks, newTask];                 // Met à jour les données
  this.taskSubject.next(this.tasks);                     // Émet la nouvelle liste
}
```

#### **Étape 2 : Composant (HomeComponent)**
```typescript
tasks$!: ReturnType<TaskService['getTasks']>;

constructor(private taskService: TaskService) {
  this.tasks$ = this.taskService.tasks$;                 // S'abonne au flux
}

onAddTask(title, description) {
  this.taskService.addTask({ title, description });      // Appelle le service
}
```

#### **Étape 3 : Template (home.component.html)**
```html
@if (tasks$ | async; as tasks) {                         <!-- Pipe async s'abonne -->
  @for (task of tasks; track task.id) {                  <!-- Boucle sur les données -->
    <li>{{ task.title }}</li>                            <!-- Affiche les données -->
  }
}
```

### 5. Points clés retenus
- **Pas besoin d'appeler `getTasks()` à chaque fois** : La donnée est **vivante** et se met à jour automatiquement.
- **`| async` gère tout** : Abonnement, désabonnement et actualisation de la vue sont automatiques.
- **Le flux reste cohérent** : Une seule source de vérité (le BehaviorSubject) synchronise le service et tous les composants.
- **Immutabilité** : On crée de nouveaux tableaux (`[...this.tasks, newTask]`) au lieu de modifier l'ancien pour faciliter la détection des changements.

---

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
