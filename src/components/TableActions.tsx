type TableActionsProps = {
  onDelete(): void;
};

function TableActions({ onDelete = () => {} }: TableActionsProps) {
  return (
    <div className="btn-group">
      <button className="btn btn-outline btn-sm btn-error" onClick={onDelete}>
        delete
      </button>
    </div>
  );
}

export default TableActions;
