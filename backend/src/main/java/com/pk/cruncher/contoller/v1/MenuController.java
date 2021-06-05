package com.pk.cruncher.contoller.v1;

import com.pk.cruncher.contoller.v1.request.*;
import com.pk.cruncher.dto.*;
import com.pk.cruncher.service.*;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("menu/")
public class MenuController {

    private final CategoryService categoryService;
    private final IngredientService ingredientService;
    private final WorkshopService workshopService;
    private final ProductService productService;
    private final PrepackService prepackService;
    private final DishService dishService;

    public MenuController(CategoryService categoryService, IngredientService ingredientService,
                          WorkshopService workshopService, ProductService productService,
                          PrepackService prepackService, DishService dishService) {
        this.categoryService = categoryService;
        this.ingredientService = ingredientService;
        this.workshopService = workshopService;
        this.productService = productService;
        this.prepackService = prepackService;
        this.dishService = dishService;
    }

    @GetMapping("getCategories")
    public List<CategoryDTO> getCategories() {
        return categoryService.getAll();
    }

    @GetMapping("getDeletedCategories")
    public List<CategoryDTO> getDeletedCategories() {
        return categoryService.getDeleted();
    }

    @GetMapping("getCategory")
    public CategoryDTO getCategory(@RequestParam @NotNull UUID id) {
        return categoryService.getById(id);
    }

    @PostMapping("createCategory")
    public CategoryDTO createCategory(@RequestBody @NotNull CategoryRequest request) {
        return categoryService.create(request);
    }

    @PutMapping("updateCategory")
    public CategoryDTO updateCategory(@RequestBody @NotNull CategoryRequest request) {
        return categoryService.update(request);
    }

    @DeleteMapping("deleteCategory")
    public CategoryDTO deleteCategory(@RequestParam @NotNull UUID id) {
        return categoryService.delete(id);
    }

    @PutMapping("recoverCategory")
    public CategoryDTO recoverCategory(@RequestParam @NotNull UUID id) {
        return categoryService.recover(id);
    }

    @GetMapping("getIngredients")
    public List<IngredientDTO> getIngredients() {
        return ingredientService.getAll();
    }

    @GetMapping("getDeletedIngredients")
    public List<IngredientDTO> getDeletedIngredients() {
        return ingredientService.getDeleted();
    }

    @GetMapping("getIngredient")
    public IngredientDTO getIngredient(@RequestParam @NotNull UUID id) {
        return ingredientService.getById(id);
    }

    @GetMapping("getIngredientsForRecipe")
    public List<IngredientDTO> getIngredientsForRecipe() {
        return ingredientService.getAllIngredientsForRecipe();
    }

    @PostMapping("createIngredient")
    public IngredientDTO createIngredient(@RequestBody @NotNull IngredientRequest request) {
        return ingredientService.create(request);
    }

    @PutMapping("updateIngredient")
    public IngredientDTO updateIngredient(@RequestBody @NotNull IngredientRequest request) {
        return ingredientService.update(request);
    }

    @DeleteMapping("deleteIngredient")
    public IngredientDTO deleteIngredient(@RequestParam @NotNull UUID id) {
        return ingredientService.delete(id);
    }

    @PutMapping("recoverIngredient")
    public IngredientDTO recoverIngredient(@RequestParam @NotNull UUID id) {
        return ingredientService.recover(id);
    }

    @GetMapping("getWorkshops")
    public List<WorkshopDTO> getWorkshops() {
        return workshopService.getAll();
    }

    @GetMapping("getWorkshop")
    public WorkshopDTO getWorkshop(@RequestParam @NotNull UUID id) {
        return workshopService.getById(id);
    }

    @GetMapping("getDeletedWorkshops")
    public List<WorkshopDTO> getDeletedWorkshops() {
        return workshopService.getDeleted();
    }

    @PostMapping("createWorkshop")
    public WorkshopDTO createWorkshop(@RequestBody @NotNull WorkshopRequest request) {
        return workshopService.create(request);
    }

    @PutMapping("updateWorkshop")
    public WorkshopDTO updateWorkshop(@RequestBody @NotNull WorkshopRequest request) {
        return workshopService.update(request);
    }

    @DeleteMapping("deleteWorkshop")
    public WorkshopDTO deleteWorkshop(@RequestParam @NotNull UUID id) {
        return workshopService.delete(id);
    }

    @DeleteMapping("recoverWorkshop")
    public WorkshopDTO recoverWorkshop(@RequestParam @NotNull UUID id) {
        return workshopService.recover(id);
    }

    @GetMapping("getProducts")
    public List<ProductDTO> getProducts() {
        return productService.getAll();
    }

    @GetMapping("getDeletedProducts")
    public List<ProductDTO> getDeletedProducts() {
        return productService.getDeleted();
    }

    @GetMapping("getProduct")
    public ProductDTO getProduct(@RequestParam @NotNull UUID id) {
        return productService.getById(id);
    }

    @PostMapping("createProduct")
    public ProductDTO createProduct(@RequestBody @NotNull ProductRequest request) {
        return productService.create(request);
    }

    @PutMapping("updateProduct")
    public ProductDTO updateProduct(@RequestBody @NotNull ProductRequest request) {
        return productService.update(request);
    }

    @DeleteMapping("deleteProduct")
    public ProductDTO deleteProduct(@RequestParam @NotNull UUID id) {
        return productService.delete(id);
    }

    @PutMapping("recoverProduct")
    public ProductDTO recoverProduct(@RequestParam @NotNull UUID id) {
        return productService.recover(id);
    }

    @GetMapping("getPrepacks")
    public List<PrepackDTO> getPrepacks() {
        return prepackService.getAll();
    }

    @GetMapping("getDeletedPrepacks")
    public List<PrepackDTO> getDeletedPrepacks() {
        return prepackService.getDeleted();
    }

    @GetMapping("getPrepack")
    public PrepackDTO getPrepack(@RequestParam @NotNull UUID id) {
        return prepackService.getById(id);
    }

    @PostMapping("createPrepack")
    public void createPrepack(@RequestBody @NotNull PrepackRequest request) {
        prepackService.create(request);
    }

    @PutMapping("updatePrepack")
    public void updatePrepack(@RequestBody @NotNull PrepackRequest request) {
        prepackService.update(request);
    }

    @DeleteMapping("deletePrepack")
    public PrepackDTO deletePrepack(@RequestParam @NotNull UUID id) {
        return prepackService.delete(id);
    }

    @PutMapping("recoverPrepack")
    public PrepackDTO recoverPrepack(@RequestParam @NotNull UUID id) {
        return prepackService.recover(id);
    }


    @GetMapping("getDishes")
    public List<DishDTO> getDishes() {
        return dishService.getAll();
    }

    @GetMapping("getDeletedDishes")
    public List<DishDTO> getDeletedDishes() {
        return dishService.getDeleted();
    }

    @GetMapping("getDish")
    public DishDTO getDish(@RequestParam @NotNull UUID id) {
        return dishService.getById(id);
    }

    @PostMapping("createDish")
    public void createDish(@RequestBody @NotNull DishRequest request) {
        dishService.create(request);
    }

    @PutMapping("updateDish")
    public void updateDish(@RequestBody @NotNull DishRequest request) {
        dishService.update(request);
    }

    @DeleteMapping("deleteDish")
    public DishDTO deleteDish(@RequestParam @NotNull UUID id) {
        return dishService.delete(id);
    }

    @PutMapping("recoverDish")
    public DishDTO recoverDish(@RequestParam @NotNull UUID id) {
        return dishService.recover(id);
    }

}
