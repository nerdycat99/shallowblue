class Tree
  attr_accessor :payload, :children
  def initialize(payload, children)
    @payload = payload
    @children = children
  end
end

 
# The "Leafs" of a tree, elements that have no children
deep_fifth_node = Tree.new(5, [])
eleventh_node = Tree.new(11, [])
fourth_node   = Tree.new(4, []) 

# The "Branches" of the tree
ninth_node = Tree.new(9, [fourth_node])
sixth_node = Tree.new(6, [deep_fifth_node, eleventh_node])
seventh_node = Tree.new(7, [sixth_node])
shallow_fifth_node = Tree.new(5, [ninth_node])

# The "Trunk" of the tree
trunk   = Tree.new(2, [seventh_node, shallow_fifth_node])


def breadth_search(level_to_search, search_value)

    next_iteration = []
    level_to_search.each {|item|
      puts item.payload
      return "found: " + item.payload.to_s if item.payload == search_value
      item.children.each do |child_item|
        next_iteration.push(child_item)
      end
    }
    return "item not found" if next_iteration.length == 0
    breadth_search(next_iteration, search_value)
end

start_level = [trunk]
search_value = 6
puts breadth_search(start_level, search_value)


